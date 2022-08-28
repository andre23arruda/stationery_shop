# import os
# from celery import Celery
# from django.conf import settings

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'setup.settings')

# app = Celery('project')
# app.config_from_object('django.conf:settings', namespace='CELERY')
# # app.autodiscover_tasks()
# app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


# @app.task(bind=True)
# def debug_task(self):
#     print(f'Request: {self.request!r}')


import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'setup.settings')
app = Celery('setup')

CELERY_CONFIG = {
    'accept_content': ['json'],
    'broker_url': 'redis://localhost:6379/0',
    'enable_utc': True,
    'result_backend': None,
    'result_serializer': 'json',
    'task_serializer': 'json',
    'worker_enable_remote_control': False,
}

app.conf.update(**CELERY_CONFIG)

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
