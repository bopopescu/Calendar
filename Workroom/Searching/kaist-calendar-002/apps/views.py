# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, url_for, redirect, flash, session, g, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from apps import app
from sqlalchemy import desc

event_1 = { 'id': 0, 'title': u'사자'} 
event_2 = { 'id': 1, 'title': u'abcdabcd'}
event_3 = { 'id': 2, 'title': 'dddddd'}
event_4 = { 'id': 3, 'title': 'lion'}

event_list = [event_1, event_2, event_3, event_4]
    
@app.route('/')
@app.route('/index')
def index():

    found_list = [0, 1,2, 3]
    return render_template('index.html', event_list=event_list, found_list=found_list)

@app.route('/search', methods=['POST'])
def search():

    keyword = request.form['keyword']

    found_list = [] # 조건에 만족하는 것들의 id를 담을 리스트. 

    for event in event_list:
    	if keyword in event['title']: # database 에 맞게 수정 필요 
    		if event['id'] not in found_list:
      			found_list.append(event['id'])

    return render_template('index.html', event_list = event_list, found_list=found_list)