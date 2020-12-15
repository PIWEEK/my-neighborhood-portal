from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return HttpResponse(
        """
        <h1>Servidor backend del Portal del Barrio.</h1>
        <p>Aquí no hay servicio directo a los usuarios.</p>
        """)
