import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Single = () => {
	const { store, actions } = useContext(Context);
	const id = useParams();

	useEffect(() => {
		actions.verDetalle(id);
	}, []);
	console.log(id)
	return (
		<div className="jumbotron">
			

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
