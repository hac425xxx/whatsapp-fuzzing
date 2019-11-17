#!/usr/bin/python
# -*- coding: UTF-8 -*-
import frida, sys


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


jscode = ""

with open("whatsapp.js") as fp:
    jscode = fp.read()

# 运行中hook
process = frida.get_usb_device().attach('com.whatsapp')
script = process.create_script(jscode)
script.on('message', on_message)
print('[*] Running test')
script.load()
sys.stdin.read(1)
