# Generated by Django 3.1.4 on 2020-12-15 09:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('directory', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialNetwork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isDefault', models.BooleanField()),
                ('networkType', models.CharField(choices=[('blog', 'Blog'), ('twitter', 'Twitter'), ('facebook', 'Facebook'), ('instagram', 'Instagram')], max_length=50)),
                ('url', models.URLField()),
                ('iconUrl', models.URLField()),
            ],
            options={
                'verbose_name': 'social network',
                'verbose_name_plural': 'social networks',
            },
        ),
        migrations.AlterModelOptions(
            name='entity',
            options={'verbose_name_plural': 'entities'},
        ),
        migrations.CreateModel(
            name='SocialPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField()),
                ('date', models.DateTimeField()),
                ('imageUrl', models.URLField()),
                ('text', models.TextField()),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entities.socialnetwork')),
            ],
            options={
                'verbose_name': 'social post',
                'verbose_name_plural': 'social posts',
            },
        ),
        migrations.AddField(
            model_name='socialnetwork',
            name='entity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entities.entity'),
        ),
    ]
