"""empty message

Revision ID: d6dfde54f4d5
Revises: 9f7dbff9b9fa
Create Date: 2022-12-24 15:27:55.062247

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6dfde54f4d5'
down_revision = '9f7dbff9b9fa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('packages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('package_name', sa.String(length=120), nullable=True),
    sa.Column('category', sa.String(length=120), nullable=True),
    sa.Column('description', sa.String(length=50), nullable=True),
    sa.Column('title', sa.String(length=120), nullable=True),
    sa.Column('tour_duration', sa.String(length=120), nullable=True),
    sa.Column('destinations', sa.String(length=120), nullable=True),
    sa.Column('activities', sa.String(length=120), nullable=True),
    sa.Column('transport', sa.String(length=120), nullable=True),
    sa.Column('lodging', sa.String(length=120), nullable=True),
    sa.Column('overview_title', sa.String(length=120), nullable=True),
    sa.Column('overview_acomodation', sa.String(length=120), nullable=True),
    sa.Column('overview_description', sa.String(length=999), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('country', sa.String(length=120), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('country')
        batch_op.drop_column('last_name')
        batch_op.drop_column('name')

    op.drop_table('packages')
    # ### end Alembic commands ###
