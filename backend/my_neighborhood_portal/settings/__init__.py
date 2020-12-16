import sys

try:
    from .local import *
except ImportError:
    print("«local.py» file does not exist.")
    print("Go to settings directory and copy «local.py.example» to «local.py»")
    sys.exit(-1)
