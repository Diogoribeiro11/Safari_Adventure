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
    body = request.get_json()
    if (body is None):
        return 'Missing info'
    if ('email' not in body):
        return 'Missing Email'
    if ('password' not in body):
        return 'Missing Password'
    new_user = User.query.filter_by(email = body['email']).first()
    if (new_user is None):
        new_user = User(name = body['name'], last_name = body['last_name'], country = body['country'], email = body['email'], password = body['password'], is_active = True)
        db.session.add(new_user)
        db.session.commit()
        return 'User Register'

#---------------------------------------------------------------------------------------------------
#                               EDIT USER PUT
#---------------------------------------------------------------------------------------------------

@api.route('/user/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    body = json.loads(request.data)
    user = User.query.filter_by(id=user_id).first()
    if "name" in body:
        user.name = body["name"]   
    if "last_name" in body:
        user.last_name = body["last_name"]   
    if "country" in body:
        user.country = body["country"]   
   
    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200
    


#---------------------------------------------------------------------------------------------------
#                                 LOGIN POST
#---------------------------------------------------------------------------------------------------

@api.route('/login', methods=['POST'])
def set_login():
    body = request.get_json()
    if (body is None):
        return 'Missing info'
    if ('email' not in body):
        return 'Missing Email'
    if ('password' not in body):
        return 'Missing Password'
    user_login = User.query.filter_by(email = body['email']).first()
    if (user_login):
        if(user_login.password == body['password']):
            
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

#---------------------------------------------------------------------------------------------------
#                       PUT EDIT PACKAGES  
#---------------------------------------------------------------------------------------------------

@api.route('/packages/<int:packages_id>', methods=['PUT'])
def edit_package(packages_id):
    body = json.loads(request.data)
    package = Packages.query.filter_by(id=packages_id).first()
    if package is None:
        return json({"msg": "Package not found"}), 404
    
    if "package_name" in body:
        package.package_name = body["package_name"]
    if "category" in body:
        package.category = body["category"]
    if "description" in body:
        package.description = body["description"]
    if "title" in body:
        package.title = body["title"]
    if "tour_duration" in body:
        package.tour_duration = body["tour_duration"]
    if "destinations" in body:
        package.destinations = body["destinations"]
    if "activities" in body:
        package.activities = body["activities"]
    if "transport" in body:
        package.transport = body["transport"]
    if "lodging" in body:
        package.lodging = body["lodging"]
    if "overview_title" in body:
        package.overview_title = body["overview_title"]
    if "overview_acomodation" in body:
        package.overview_acomodation = body["overview_acomodation"]
    if "overview_description" in body:
        package.overview_description = body["overview_description"]
    db.session.commit()
    return jsonify({"msg":"Package updated successfully"}), 200