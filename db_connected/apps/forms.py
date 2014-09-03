# -*- coding: utf-8 -*-
from flask.ext.wtf import Form
from wtforms import (
    StringField,
    TextAreaField,
    BooleanField,
    FileField
)
from wtforms import validators


class ApplyForm(Form):
    title_cal = StringField(
        u'짧은 행사명',
        [validators.data_required(u'달력용 짧은 행사명을 입력하시기 바랍니다.')],
        description={'placeholder': u'달력용 짧은 행사명을 입력하세요.'}
    )
    title = StringField(
        u'행사명',
        [validators.data_required(u'행사명을 입력하시기 바랍니다.')],
        description={'placeholder': u'행사명을 입력하세요.'}
    )
    host = StringField(
        u'주최',
        [validators.data_required(u'주최자 입력하시기 바랍니다.')],
        description={'placeholder': u'주최자 입력하세요.'}
    )
    link = StringField(
        u'첨부링크',
        [validators.data_required(u'첨부링크를 입력하시기 바랍니다.')],
        description={'placeholder': u'첨부링크를 입력하세요.'}
    )
    location = StringField(
        u'장소',
        [validators.data_required(u'장소를 입력하시기 바랍니다.')],
        description={'placeholder': u'장소를 입력하세요.'}
    )
    content = TextAreaField(
        u'소개글',
        [validators.data_required(u'소개글을 입력하시기 바랍니다.')],
        description={'placeholder': u'소개글을 입력하세요'}
    )
    contact = StringField(
        u'연락처',
        [validators.data_required(u'연락처를 입력하시기 바랍니다.')],
        description={'placeholder': u'연락처를 입력하세요'}
    )
    contact_open = BooleanField(
        u'공개',
        [validators.data_required(u'연락처 공개여부를 선택하시기 바랍니다.')],
        description={'placeholder': u'연락처 공개여부를 선택하세요'}
    )
    poster = FileField(
        u'포스터',
        [validators.data_required(u'포스터를 선택하세요.')],
        description={'placeholder': u'포스터를 선택하세요'}
    )
