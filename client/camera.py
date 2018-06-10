#!/usr/bin/python3
from picamera import PiCamera
import time
import datetime

def init_settings(camera):
    camera.resolution = (1280, 720)
    camera.framerate = 20
    print("Car Cam - Camera Initializing\n\tResolution: {}\n\tFrameRate: {}".format(camera.resolution, camera.framerate))

def record(camera):
    #Create File Name
    cam_file = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d_%H-%M-%S.h264')
    print("Recording to File: {}".format(cam_file))
    rec_time = 0
    camera.start_recording(cam_file)
    while(car_on()):# Record while the car is on
        camera.wait_recording(1)
        rec_time += 1
        if(rec_time >= 3600):# Split video after 1 hour of footage
            cam_file = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d_%H-%M-%S.h264')
            camera.split_recording(cam_file)
            print("Hour Limit Reached - Spliting to File: {}".format(cam_file))
        if force_rec_stop():
            break

    camera.stop_recording()
    print("Recording Stopped!")

#TODO return true if the car is on, else false
def car_on():
    return True

#TODO return true if force recording button is pressed
def force_rec_stop():
    return False

camera = PiCamera()
init_settings(camera)
record(camera)
