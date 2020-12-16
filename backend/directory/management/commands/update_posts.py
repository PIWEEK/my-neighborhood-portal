from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from directory.models import Entity, SocialNetwork, SocialPost

import requests
import feedparser
import datetime


class Command(BaseCommand):
    help = 'Get the latest posts of all social networks'

    def handle(self, *args, **kwargs):
        for entity in Entity.objects.all():
            for network in entity.networks.all():
                self._update_posts(entity, network)


    def _update_posts(self, entity, network):
        posts = []

        if network.network_type == "blog":
            posts = self._read_atom_feed(network)
        elif network.network_type == "twitter":
            posts = self._read_twitter_timeline(network)


    def _read_atom_feed(self, network):
        result = feedparser.parse(network.url + "/feeds/posts/default")

        SocialPost.objects.filter(network=network).delete()

        for entry in result.entries[:10]:
            thumbnails = entry.get("media_thumbnail")
            if thumbnails:
                image_url = thumbnails[0].get("url")
            else:
                image_url = ""
            post = SocialPost.objects.create(
                network = network,
                url = entry.link,
                date = _tuple_to_datetime(entry.published_parsed),
                image_url = image_url,
                text = entry.summary,
            )
            print(post)

    def _read_twitter_timeline(self, network):
        user_id = network.url[len("https://twitter.com/"):]
        api_url = "https://api.twitter.com/2/tweets/search/recent"
        params = {
            "tweet.fields": "attachments,created_at",
            "media.fields": "preview_image_url,url",
            "expansions": "attachments.media_keys",
            "query": "from:%s" % user_id
        }
        headers = {
            "Authorization": "Bearer %s" % settings.TWITTER_BEARER_TOKEN,
        }
        result = requests.get(api_url, params=params, headers=headers).json()

        SocialPost.objects.filter(network=network).delete()

        media = result.get("includes", {}).get("media", [])
        for tweet in result.get("data", []):
            image = None
            media_keys = tweet.get("attachments", {}).get("media_keys", [])
            if media_keys:
                media_key = media_keys[0]
                images = [item for item in media if item["media_key"] == media_key]
                if images:
                    image = images[0]

            post = SocialPost.objects.create(
                network = network,
                url = "https://twitter.com/%s/status/%s" % (user_id, tweet["id"]),
                date = _isoformat_to_datetime(tweet["created_at"]),
                image_url = image["url"] if image else "",
                text = tweet.get("text", ""),
            )
            print(post)


def _tuple_to_datetime(time_tuple):
    return datetime.datetime(
        *time_tuple[0:6],
        0,
        datetime.timezone.utc
    )


def _isoformat_to_datetime(isoformat):
    return datetime.datetime.fromisoformat(isoformat[:-1] + "+00:00")

