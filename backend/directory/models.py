from django.db import models

class Entity(models.Model):
    name = models.CharField(unique=True, max_length=200)
    image_url = models.URLField()
    description = models.TextField()
    email = models.EmailField()

    class Meta:
        verbose_name = "entity"
        verbose_name_plural = "entities"
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
    isDefault = models.BooleanField()
    networkType = models.CharField(
        max_length=50,
        choices=NetworkTypes.choices,
    )
    url = models.URLField()
    iconUrl = models.URLField()

    class Meta:
        verbose_name = "social network"
        verbose_name_plural = "social networks"
        ordering = ["entity_id", "networkType", "id"]

    def __str__(self):
        return '%s - %s [%d]' % (self.entity.name, self.networkType, self.id)


class SocialPost(models.Model):
    network = models.ForeignKey(
        SocialNetwork,
        on_delete=models.CASCADE,
        related_name='posts',
    )
    url = models.URLField()
    date = models.DateTimeField()
    imageUrl = models.URLField()
    text = models.TextField()

    class Meta:
        verbose_name = "social post"
        verbose_name_plural = "social posts"
        ordering = ["network_id", "date"]

    def __str__(self):
        return '%s - %s [%s]' % (self.network.entity.name, self.network.networkType, self.date)

