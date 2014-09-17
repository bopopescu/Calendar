# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, url_for, redirect, flash, session, g, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from apps import app, db
from models import Event
from sqlalchemy import desc
from forms import EventForm

@app.route('/', methods=['GET'])
def event_list():
    context = {}
    context['event_list'] = Event.query.order_by(desc(Event.date_created)).all()
    return render_template("home.html", context=context)

@app.route('/event/create/', methods=['GET', 'POST'])
def event_create():
    form = EventForm()

    if request.method == 'POST':
        if form.validate_on_submit():
            event = Event(
                title = form.title.data,
                title_cal = form.title_cal.data,
                content = form.content.data,
                host = form.host.data,
                category_char = form.category_char.data,
                category_host = form.category_host.data,
                date_start = form.date_start.data,
                date_end = form.date_end.data,
                location = form.location.data,
                link = form.link.data,
                poster = form.poster.data,
                contact = form.contact.data,
                contact_open = form.contact_open.data,
                password = form.password.data
            )

            db.session.add(event)
            db.session.commit()

            flash(u'이벤트를 등록했습니다.', 'success')
            return redirect(url_for('event_list'))

    return render_template('event/create.html', form=form)

@app.route('/event/detail/<int:id>', methods=['GET'])
def event_detail(id):
    event = Event.query.get(id)

    return render_template('event/detail.html', event=event)

@app.route('/event/update/<int:id>', methods=['GET', 'POST'])
def event_update(id):
    event = Event.query.get(id)
    form = EventForm(request.form, obj=event)
    if request.method == 'POST':
        if form.validate_on_submit():
            form.populate_obj(event)
            db.session.commit()
        
            flash(u'이벤트 정보를 수정하였습니다.', 'success')
            return redirect(url_for('event_list'))

    return render_template('event/update.html', form=form)



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

@app.route('/get_month')
def get_month():
	month = request.args.get('month', 0, type=int)
	return jsonify(month = month)

@app.route('/get_week')
def get_week():
	week = request.args.get('week', 0, type=int)
	return jsonify(week = week)

@app.route('/categorize')
def categorize():
	category = request.args.get('category','None',type=str)
	# selected_events = Event.query.filter(Event.category_host == category)
	return jsonify(category = category)


#
# @error Handlers
#
# Handle 404 errors
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Handle 500 errors
@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500