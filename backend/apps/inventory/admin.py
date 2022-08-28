from django.contrib import admin
from django.conf.locale.pt_BR import formats as portuguese
from django.conf.locale.en import formats as english

from inventory.models import Product, IOHistory


portuguese.DATE_FORMAT = 'd/m/Y'
english.DATE_FORMAT = 'd/m/Y'


class ProductAdmin(admin.ModelAdmin):
    change_list_template = 'inventory/products_changelist.html'
    list_display = ['code', 'name', 'available_quantity', 'category']


class IOHistoryAdmin(admin.ModelAdmin):
    list_display = ['product', 'quantity_in', 'quantity_out', 'date']
    list_filter = ['product']
    search_fields = ['product__name']
    ordering = ['product__name']


admin.site.register(Product, ProductAdmin)
admin.site.register(IOHistory, IOHistoryAdmin)
