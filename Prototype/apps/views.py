# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, url_for, redirect, flash, session, g, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from apps import app
from sqlalchemy import desc

@app.route('/')
@app.route('/index')
def index():
    return render_template("test.html")

@app.route('/get_inform')
def get_inform():

	id = request.args.get('id', 0, type=int)

	inform = {}
	inform['id'] = 1
	inform['title'] = '동틀무렵 7080 나이트'
	inform['content'] = '안녕하세요, KAIST 동틀무렵입니다. 잘 부탁드립니다'
	inform['host'] = '동틀무렵'
	inform['category_char'] = '공연'
	inform['category_host'] = '동아리'
	inform['date_start'] = '140903 19:00'
	inform['date_end'] = '140903 22:00'
	inform['location'] = '미래홀'

	return jsonify(inform = inform)