# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, url_for, redirect, flash, session, g, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from apps import app
from sqlalchemy import desc

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/getDailyList')
def get_daily_list():
    # date_ = request.args.get('date') # format: datetime 00:00

    # event_list = Event.query.filter( date_ >= Event.date_start, date_ <= Event.date_end).all() # format: datetime
    event_1 = {'title': "ㅇㅅㅂㅅ 개강파티"}
    event_2 = {'title': "ㅇㅅㅂㅅ 스터디 모임"}

    event_list = [event_1, event_2]

    return jsonify(event_list=event_list)







