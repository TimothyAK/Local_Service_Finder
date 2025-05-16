from django.http import JsonResponse, HttpResponse
import json
import asyncio

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .repository import UserRepository

async def getUsers(email):
    response = await UserRepository.get_users(email)
    return response


# Create your views here.
class UserController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__UserRepository = UserRepository()

    async def get(self, request):
        users = self.__UserRepository.get_users()
        return JsonResponse({
            'users': users
        })
