# Generated by Django 3.1.4 on 2021-01-11 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_remove_grandparent_gtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grandparent',
            name='side',
            field=models.CharField(choices=[('Mother', 'Mother'), ('Father', 'Father')], default='Mother', max_length=10),
        ),
    ]