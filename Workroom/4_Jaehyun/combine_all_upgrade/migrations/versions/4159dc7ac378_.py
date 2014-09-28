"""empty message

Revision ID: 4159dc7ac378
Revises: 35a9910d599b
Create Date: 2014-09-16 13:22:51.558197

"""

# revision identifiers, used by Alembic.
revision = '4159dc7ac378'
down_revision = '35a9910d599b'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('event', sa.Column('acceptance', sa.Boolean(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('event', 'acceptance')
    ### end Alembic commands ###
