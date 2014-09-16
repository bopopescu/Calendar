# -*- coding: utf-8 -*-

from apps import app, db
from models import Event

from flask.ext.wtf import Form

from wtforms import (
StringField,
TextAreaField,
DateTimeField,
BooleanField,
SelectField
)

from wtforms import validators
from wtforms.fields.html5 import EmailField


class EventForm(Form):

    title = StringField(
        u'제목',
        [validators.data_required(u'제목을 입력하시기 바랍니다.')],
        description={'placeholder': u'제목을 입력하세요.'}
    )

    title_cal = StringField(
        u'짧은 제목',
        [validators.data_required(u'짧은 제목을 입력하시기 바랍니다.')],
        description={'placeholder': u'짧은 제목을 입력하세요.'}
    )

    content = TextAreaField(
        u'행사 설명',
        [validators.data_required(u'행사 설명을 입력하시기 바랍니다.')],
        description={'placeholder': u'행사 설명을 입력하세요.'}
    )

    host = StringField(
        u'주최자(단체)',
        [validators.data_required(u'주최자(단체) 정보를 입력하시기 바랍니다.')],
        description={'placeholder': u'주최자(단체) 정보를 입력하세요.'}
    )

    category_char = SelectField(
        u'이벤트 카테고리',
        [validators.data_required(u'이벤트 카테고리를 선택하시기 바랍니다.')],
        choices=[('concert', u'공연'), ('exhib', u'전시/상영'), ('comp', u'대회'), ('seminar', u'강연/세미나/워크샵'), ('recr', u'모집'), ('contest', u'공모전'), ('sell', u'판매'), ('etc', u'기타')],
        description={'placeholder': u'이벤트 카테고리를 선택하세요.'}
    )

    category_host = SelectField(
        u'주최자(단체) 카테고리',
        [validators.data_required(u'주최자(단체) 카테고리를 선택하시기 바랍니다.')],
        choices=[('club', u'동아리'), ('student', u'자치단체'), ('uni', u'학교'), ('etc', u'기타')],
        description={'placeholder': u'주최자(단체) 카테고리를 선하세요.'}
    )

    date_start = DatetimeField(
        u'이벤트 시작시각',
        [validators.data_required(u'이벤트 시작시각을 선택하시기 바랍니다.')],
        description={'placeholder': u'이벤트 시작시각을 선택하세요.'}
    )

    date_end = DatetimeField(
        u'이벤트 마감시각',
        [validators.data_required(u'이벤트 마감시각을 선택하시기 바랍니다.')],
        description={'placeholder': u'이벤트 마감시각을 선택하세요.'}
    )

    location = StringField(
        u'장소',
        [validators.data_required(u'장소를 입력하시기 바랍니다.')],
        description={'placeholder': u'장소를 입력하세요.'}
    )

    link = StringField(
        u'링크',
        [validators.data_required(u'링크를 입력하시기 바랍니다.')],
        description={'placeholder': u'추가정보 링크를 입력하세요.'}
    )

    poster = StringField(
        u'포스터',
        [validators.data_required(u'이미지 링크를 입력하시기 바랍니다.')],
        description={'placeholder': u'포스터 이미지 링크를 입력하세요.'}
    )

    contact = EmailField(
        u'E-mail',
        [validators.data_required(u'메일주소를 입력하시기 바랍니다.')],
        description={'placeholder': u'메일주소를 입력하세요.'}
    )

    contact_open = BooleanField(
        u'연락처(메) 공개/비공개',
        [validators.data_required(u'연락처 공개여부를 선택하시기 바랍니다.')],
        description={'placeholder': u'연락처 공개여부를 선택하세요.'}
    )


