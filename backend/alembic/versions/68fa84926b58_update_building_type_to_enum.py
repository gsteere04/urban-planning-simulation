"""update building type to enum

Revision ID: 68fa84926b58
Revises: 
Create Date: 2024-10-09 10:21:28.373279

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '68fa84926b58'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    
    # Create the enum type if it doesn't exist already
    if not conn.dialect.has_type(conn, 'buildingtype'):
        building_type_enum = sa.Enum('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'GOVERNMENTAL', 'TRANSPORTATION', 'OTHER', name='buildingtype')
        building_type_enum.create(conn)  # Create the enum type in the database

    # Alter the type column to use the new enum with a USING clause
    op.execute("ALTER TABLE buildings ALTER COLUMN type TYPE buildingtype USING type::buildingtype")


def downgrade() -> None:
    # Change the type back to VARCHAR during downgrade
    op.execute("ALTER TABLE buildings ALTER COLUMN type TYPE VARCHAR")

    # Drop the enum type if it exists
    conn = op.get_bind()
    if conn.dialect.has_type(conn, 'buildingtype'):
        sa.Enum(name='buildingtype').drop(conn)
