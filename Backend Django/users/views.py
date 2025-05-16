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
    async def get(self, request, id=None):
        asyncio.run()