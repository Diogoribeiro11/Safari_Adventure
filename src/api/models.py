from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

##-----------------------------------------USER TABLE--------------------------------------------------------------------

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    country = db.Column(db.String(120), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
            "last_name": self.last_name,
            "country": self.country,
            # do not serialize the password, its a security breach
        }

##---------------------------------------PACKAGES TABLE----------------------------------------------------------------

class Packages(db.Model):
    __tablename__= 'packages'
    id = db.Column(db.Integer, primary_key=True)
    package_name = db.Column(db.String(120), unique=False, nullable=True)
    category = db.Column(db.String(120), unique=False, nullable=True)
    description = db.Column(db.String(50), unique=False, nullable=True)
    title = db.Column(db.String(120), unique=False, nullable=True)
    tour_duration = db.Column(db.String(120), unique=False, nullable=True)
    destinations = db.Column(db.String(120), unique=False, nullable=True)
    activities = db.Column(db.String(120), unique=False, nullable=True)
    transport = db.Column(db.String(120), unique=False, nullable=True)
    lodging = db.Column(db.String(120), unique=False, nullable=True)
    overview_title = db.Column(db.String(120), unique=False, nullable=True)
    overview_acomodation = db.Column(db.String(120), unique=False, nullable=True)
    overview_description = db.Column(db.String(999), unique=False, nullable=True)

    def __repr__(self):
        return f'<Packages {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "package_name": self.package_name,
            "category": self.category,
            "description": self.description,
            "title":self.title,
            "tour_duration": self.tour_duration,
            "destinations": self.destinations,
            "activities": self.activities,
            "transport": self.transport,
            "lodging": self.lodging,
            "overview_title": self.overview_title,
            "overview_acomodation": self.overview_acomodation,
            "overview_description": self.overview_description,
            
        }