# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, url_for, redirect, flash, session, g, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from apps import app, db
from models import Event
from sqlalchemy import desc
from forms import EventForm

import logging


@app.route('/')
@app.route('/index')
def index():
    context = {}
    context['event_list'] = Event.query.order_by(
        desc(Event.date_created)).all()
    return render_template("test.html", context=context)


@app.route('/event_list', methods=['GET'])
def event_list():
    # get query
    query = request.args.get('query', 'None', type=str)
    print "query: " + query

    # get query
    category = request.args.get('category', 'None', type=str)
    print "category: " + category

    # get first date
    first_date = request.args.get('first_date', 'None', type=str)
    print "first_date: " + first_date

    # get last date
    last_date = request.args.get('last_date', 'None', type=str)
    print "last_date: " + last_date

    # load events and filter events
    if category:  # category has value
        if query:  # query has value
            event_list = Event.query.filter_by(category_char=category).filter(Event.title.like("%" + query + "%")).order_by(Event.date_start).filter(
                Event.date_end >= first_date).filter(Event.date_start <= last_date).all()
            print "1"
        else:  # query has no value
            event_list = Event.query.filter_by(category_char=category).order_by(Event.date_start).filter(
                Event.date_end >= first_date).filter(Event.date_start <= last_date).all()
            print "2"
    else:  # category has no value
        if query:  # query has value
            event_list = Event.query.filter(Event.title.like("%" + query + "%")).order_by(Event.date_start).filter(
                Event.date_end >= first_date).filter(Event.date_start <= last_date).all()
            print "3"
        else:  # query has no value
            # http://stackoverflow.com/questions/8895208/sqlalchemy-how-to-filter-date-field
            event_list = Event.query.order_by(Event.date_start).filter(
                Event.date_end >= first_date).filter(Event.date_start <= last_date).all()
            print "4"

    print "event_list: "
    print event_list

    # http://stackoverflow.com/questions/727410/how-do-i-write-to-the-console-in-google-app-engine
    logging.info('')
    # return events

    if len(event_list) is 0:
        context = {}
        context['event_list'] = []
    else:
        context = {}
        context['event_list'] = [i.serialize for i in event_list]

    # context['event_list'] = Event.query.order_by(
    #     desc(Event.date_created)).all()
    return jsonify(context=context)


@app.route('/event/create/', methods=['GET', 'POST'])
def event_create():
    form = EventForm()

    if request.method == 'POST':
        if form.validate_on_submit():
            event = Event(
                title=form.title.data,
                title_cal=form.title_cal.data,
                content=form.content.data,
                host=form.host.data,
                category_char=form.category_char.data,
                category_host=form.category_host.data,
                date_start=form.date_start.data,
                date_end=form.date_end.data,
                location=form.location.data,
                link=form.link.data,
                poster=form.poster.data,
                contact=form.contact.data,
                contact_open=form.contact_open.data,
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


@app.route('/event/delete/<int:id>', methods=['GET', 'POST'])
def event_delete(id):
    if request.method == 'GET':
        return render_template('event/delete.html', event_id=id)
    elif request.method == 'POST':
        event_id = request.form['event_id']
        event = Event.query.get(event_id)
        db.session.delete(event)
        db.session.commit()

        flash(u'게시글을 삭제하였습니다.', 'success')
        return redirect(url_for('event_list'))


@app.route('/get_inform')
def get_inform():
    id_ = request.args.get('id_', 0, type=int)
    event_id = Event.query.get(id_)
    context = {}
    context['event'] = event_id.serialize

    return jsonify(context=context)


@app.route('/get_month')
def get_month():
    month = request.args.get('month', 0, type=int)
    return jsonify(month=month)


@app.route('/get_week')
def get_week():
    week = request.args.get('week', 0, type=int)
    return jsonify(week=week)


@app.route('/categorize')
def categorize():
    category = request.args.get('category', 'None', type=str)
    # selected_events = Event.query.filter(Event.category_host == category)
    return jsonify(category=category)
