import csv, io, time
from datetime import datetime
from celery import shared_task
from celery.utils.log import get_task_logger

from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView, Response

from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect

from inventory.models import Product, IOHistory
from inventory.serializers import ProductSerializer, QuantitySerializer
from inventory.utils import validate_data


class ListInventoryEndpoint(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailEndpoint(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'code'


class UpdateProductQuantityEndpoint(APIView):

    def post(self, request, code):
        product = get_object_or_404(Product, code=code)

        serializer = QuantitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quantity = serializer.validated_data['quantity']

        history_data = {
            'date': datetime.today(),
            'quantity_in': quantity if quantity > 0 else 0,
            'quantity_out': ((-1) * quantity) if quantity < 0 else 0,
            'product': product
        }
        IOHistory.objects.create(**history_data)

        product.available_quantity += quantity
        product.save()

        return Response({'available_quantity': product.available_quantity})


def import_from_csv(request):
    if request.method == 'POST':
        data = []
        info_message = 'Data are being saved.'

        try:
            csv_file = request.FILES['csv_file']
            data_set = csv_file.read().decode('UTF-8')
            io_string = io.StringIO(data_set)
            reader = csv.reader(io_string)
            for row in reader:
                # instance_data = validate_data(row)
                # Product.objects.get_or_create(**instance_data)
                # print(', '.join(row))
                data.append(row)
            messages.add_message(request, messages.SUCCESS, info_message)
        except Exception as error:
            info_message =f'ERROR: { str(error) }.'
            messages.add_message(request, messages.ERROR, info_message)

        save_and_send_email.delay(data)
    return redirect('/admin/inventory/product')


@shared_task()
def save_and_send_email(data: list) -> str:
    start = time.time()
    logger = get_task_logger(__name__)
    logger.info('Started task, processing...')
    time.sleep(5)
    info_message = []
    try:
        for row_number, row in enumerate(data):
            instance_data = validate_data(row)
            obj, _ = Product.objects.get_or_create(**instance_data)
            info_message.append(f'\nProduct { obj.code } created successfully!')
    except Exception as e:
        info_message.append(f'\nERROR: Check the line { row_number + 1 } of the file!')
        info_message.append(e)
    logger.info(''.join(info_message))

    # send email

    end = time.time()
    return f'Finished Task! TIME: { end - start }'