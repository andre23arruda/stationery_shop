from rest_framework import serializers

from inventory.models import Product


class ProductSerializer(serializers.ModelSerializer):
    history_list = serializers.SerializerMethodField()
    def get_history_list(self, obj):
        histories = obj.histories.all()
        return histories.values()

    class Meta:
        model = Product
        fields = '__all__'



class QuantitySerializer(serializers.Serializer):
    quantity = serializers.IntegerField()
