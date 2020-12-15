from django.core.management.base import BaseCommand, CommandError
from directory.models import Entity, SocialNetwork, SocialPost

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


def _tuple_to_datetime(time_tuple):
    return datetime.datetime(
        *time_tuple[0:6],
        0,
        datetime.timezone.utc
    )

