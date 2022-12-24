"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Packages
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime

api = Blueprint('api', __name__)

#---------------------------------------------------------------------------------------------------
#              EXAMPLE HELLO ROUTE
#---------------------------------------------------------------------------------------------------

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#---------------------------------------------------------------------------------------------------
#              GET USER 
#---------------------------------------------------------------------------------------------------

@api.route('/user', methods=['GET'])
def get_users():
    Users = User.query.all()
    Users = list(map(lambda x: x.serialize(),Users))
    return jsonify(Users)

#---------------------------------------------------------------------------------------------------
#              GET USER PRIVATE
#---------------------------------------------------------------------------------------------------

@api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def user_id(id):
    User_id = User.query.get(id)
    return jsonify(User_id.serialize())

#---------------------------------------------------------------------------------------------------
#              POST USER REGISTER
#---------------------------------------------------------------------------------------------------

@api.route('/user',  methods=['POST'])
def set_user():
    datos = request.get_json()
    if (datos is None):
        return 'Missing info'
    if ('email' not in datos):
        return 'Missing Email'
    if ('password' not in datos):
        return 'Missing Password'
    new_user = User.query.filter_by(email = datos['email']).first()
    if (new_user is None):
        new_user = User(name = datos['name'], last_name = datos['last_name'], country = datos['country'], email = datos['email'], password = datos['password'], is_active = True)
        db.session.add(new_user)
        db.session.commit()
        return 'User Register'

#---------------------------------------------------------------------------------------------------
#                                 LOGIN POST
#---------------------------------------------------------------------------------------------------

@api.route('/login', methods=['POST'])
def set_login():
    datos = request.get_json()
    if (datos is None):
        return 'Missing info'
    if ('email' not in datos):
        return 'Missing Email'
    if ('password' not in datos):
        return 'Missing Password'
    user_login = User.query.filter_by(email = datos['email']).first()
    if (user_login):
        if(user_login.password == datos['password']):
            
            access_token = create_access_token(identity = user_login.email) 
            data_token = {
                "info_user": user_login.serialize(),
                "token": access_token,
                
                "status": True 
            }
            return jsonify(data_token)     
        else:
            return 'Wrong Password'
    else:
        return "No user registered with that email"



#===================================================================================================
#================================ Packages queries ================================================
#---------------------------------------------------------------------------------------------------
#                       GET ALL PACKAGES 
#---------------------------------------------------------------------------------------------------

@api.route('/packages', methods=['GET'])
def handle_packages():

    get_packages = Packages.query.all()
    all_packages = list(map(lambda x: x.serialize(), get_packages))

    return jsonify(all_packages), 200

#---------------------------------------------------------------------------------------------------
#                       GET PACKAGE DETAILS 
#---------------------------------------------------------------------------------------------------

@api.route('/packages/<int:packages_id>', methods=['GET'])
def handle_packages_details(packages_id):
    package_detail = Packages.query.filter_by(id=packages_id).first()
    all_details = package_detail.serialize()

    return jsonify(all_details), 200

