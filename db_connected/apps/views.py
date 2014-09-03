# -*- coding: utf-8 -*-
from flask import render_template, request, redirect, session, url_for, flash
from apps import app, db
from apps.forms import ApplyForm
from apps.models import Event
from sqlalchemy import desc


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template("test.html")


# @app.route('/get_inform')
# def get_inform():
#     id = request.args.get('id', 0, type=int)
#     inform = {}
#     inform['id'] = 1
#     inform['title'] = '동틀무렵 7080 나이트'
#     inform['content'] = '안녕하세요, KAIST 동틀무렵입니다. 잘 부탁드립니다'
#     inform['host'] = '동틀무렵'
#     inform['category_char'] = '공연'
#     inform['category_host'] = '동아리'
#     inform['date_start'] = '140903 19:00'
#     inform['date_end'] = '140903 22:00'
#     inform['location'] = '미래홀'

#     return jsonify(inform=inform)


@app.route('/', methods=['GET'])
def apply_list():
    context = {}
    context['apply_list'] = Event.query.order_by(desc(Event.date_created)).all()

    return render_template('apply/apply_list.html', context=context, active_tab='timeline')


@app.route('/apply/create/', methods=['GET', 'POST'])
def apply_create():
    form = ApplyForm()
    apply_data = request.form
    if request.method == 'POST':
        if form.validate_on_submit():
            apply_create = Event(
                title_cal=form.title_cal.data,
                title=form.title.data,
                host=form.host.data,
                category_char=apply_data['category_char'],
                category_host=apply_data['category_host'],
                date_start=apply_data['date_start'],
                date_end=apply_data['date_end'],
                link=form.link.data,
                location=form.location.data,
                content=form.content.data,
                contact=form.contact.data,
                contact_open=form.contact_open.data,
                poster=form.poster.data,
            )

            db.session.add(apply_create)
            db.session.commit()
            flash(u'이벤트 지원을 마쳤습니다.', 'success')
            return redirect(url_for('apply_list'))
    return render_template('apply/create.html', form=form, active_tab='apply_create')


@app.route('/apply/detail/<int:id>', methods=['GET'])
def apply_detail(id):
    apply_detail = Event.query.get(id)

    return render_template('apply/detail.html', apply_detail=apply_detail)


@app.route('/apply/update/<int:id>', methods=['GET', 'POST'])
def apply_update(id):
    apply_update = Event.query.get(id)
    form = ApplyForm(request.form, obj=apply_update)
    if request.method == 'POST':
        if form.validate_on_submit():
            form.populate_obj(apply_update)
            db.session.commit()
            return redirect(url_for('apply_detail', id=id))
    return render_template('apply/update.html', form=form)


@app.route('/apply/delete/<int:id>', methods=['GET', 'POST'])
def apply_delete(id):
    if request.method == 'GET':
        return render_template('apply/delete.html', apply_id=id)
    elif request.method == 'POST':
        apply_id = request.form['apply_id']
        apply_delete = Event.query.get(apply_id)
        db.session.delete(apply_delete)
        db.session.commit()

        flash(u'삭제하였습니다.', 'success')
        return redirect(url_for('apply_list'))
