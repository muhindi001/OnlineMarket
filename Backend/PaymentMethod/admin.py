from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'email',
        'amount',
        'payment_method',
        'status',
        'created_at',
    )
    list_filter = ('payment_method', 'status', 'created_at')
    search_fields = ('full_name', 'email', 'transaction_id', 'phone_number', 'bank_name', 'account_number')
    ordering = ('-created_at',)
