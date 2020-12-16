from django.db import models

class Entity(models.Model):
    name = models.CharField(unique=True, max_length=200)
    image_url = models.URLField()
    description = models.TextField()
    email = models.EmailField()
    categories = models.ManyToManyField("category")

    class Meta:
        verbose_name = "entity"
        verbose_name_plural = "entities"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Category(models.Model):
    slug = models.SlugField()
    name = models.CharField(unique=True, max_length=50)

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class SocialNetwork(models.Model):

    class NetworkTypes(models.TextChoices):
      BLOG = 'blog', 'Blog'
      TWITTER = 'twitter', 'Twitter'
      FACEBOOK = 'facebook', 'Facebook'
      INSTAGRAM = 'instagram', 'Instagram'

    entity = models.ForeignKey(
        Entity,
        on_delete=models.CASCADE,
        related_name='networks',
    )
    is_default = models.BooleanField()
    network_type = models.CharField(
        max_length=50,
        choices=NetworkTypes.choices,
    )
    url = models.URLField()
    icon_url = models.URLField()

    feed_url = models.URLField(
        blank=True,
        help_text="for blogs, give the RSS/Atom feed url",
    )
    account_name = models.CharField(
        max_length=100,
        blank=True,
        help_text="For Twitter/Facebook/Instagram, give the @AccountName",
    )

    class Meta:
        verbose_name = "social network"
        verbose_name_plural = "social networks"
        ordering = ["entity_id", "network_type", "id"]

    def __str__(self):
        return '%s - %s [%d]' % (self.entity.name, self.network_type, self.id)


class SocialPost(models.Model):
    network = models.ForeignKey(
        SocialNetwork,
        on_delete=models.CASCADE,
        related_name='posts',
    )
    url = models.URLField()
    date = models.DateTimeField()
    image_url = models.URLField()
    text = models.TextField()

    class Meta:
        verbose_name = "social post"
        verbose_name_plural = "social posts"
        ordering = ["network_id", "date"]

    def __str__(self):
        return '%s - %s [%s]' % (self.network.entity.name, self.network.network_type, self.date)

