import request from 'request';

const baseUrl = 'https://api.culqi.com/v2';

const paths = {
  createToken: '/tokens',
  createCharge: '/charges',
  getCharge: '/charges/',
  createRefund: '/refunds',
  createPlan: '/plans',
  createSuscription: '/suscriptions'
}

const createPromise = (url, method, headers, body, validateParams) => {
	return new Promise((resolve, reject) => {
	    if (validateParams && body) {
	    	const keys = Object.keys(body);
	      	for (let i in validateParams) {
	        	if (keys.indexOf(validateParams[i]) === -1) {
	          		return reject({
	            		body: {
	              			object: 'error',
							type: 'Invalid parameters: ' + validateParams[i],
		              		code: '422'
	            		}
	          		});
	        	}
	      	}
	    }

	    return request({ url, method, headers, json: true, body }, (error, response) => {
	    	if (error) {
	        	return reject(error);
	      	}
	      	return resolve(response);
    	});
  });
};

class Culqi {
	constructor(codeCommerce, keyCommerce){
		this.codeCommerce = codeCommerce;
		this.keyCommerce = keyCommerce;
		this.baseUrl = baseUrl;
		this.headers = {
			Authorization: 'Bearer ' + this.keyCommerce,
			'Content-Type': 'application/json'
		};
	}

	createToken(params) {
		const url = this.baseUrl + paths.createToken;
		const fields = [
		];
		const newHeader = Object.assign({}, this.headers, {
			Authorization: 'Bearer ' + this.codeCommerce
		});

		return createPromise(url, 'POST', newHeader, params, fields);
	}

	createCharge (params){
		const url = this.baseUrl + paths.createCharge;
		const fields = [
		];

		return createPromise(url, 'POST', this.headers, params, fields);
	}

	getCharge(params){
		var url = this.baseUrl + paths.getCharge + '/' + (params || {}).id;
		var fields = [
			'id'
		];

		return createPromise(url, 'GET', this.headers, params, fields);
	}

	createRefund(params){
		var url = this.baseUrl + paths.createPlan;
		var fields = [
		];

		return createPromise(url, 'POST', this.headers, params, fields);
	}

	createPlan(params){
		var url = this.baseUrl + paths.createPlan;
		var fields = [
		];

		return createPromise(url, 'POST', this.headers, params, fields);
	}

	createSuscription(params){
		var url = this.baseUrl + paths.createSuscription;
		var fields = [
		];

		return createPromise(url, 'POST', this.headers, params, fields);
	}

}

module.exports = Culqi;
