
const JWT                   = require('./jwt-helpers');

exports.verify = (req, resp, next) => {
    if(typeof req.headers['authorization'] !== 'undefined') {
    	const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
		req.token = bearer[1];
		console.log(req.token, "in utils")
    }else if(typeof req.headers['x-access-token'] !== 'undefined') {
    	req.token = req.headers['x-access-token'];
    }
    /*You can choose either of the way mentioned above to fetch token from request*/

    if(req.token){
		const decoded = JWT.verify(req.token)
		if(decoded.name && decoded.message)
	    	return resp.status(500).json({ 'success': false, 'message': decoded.name + " - " +decoded.message });
	    else{
	    	req.verifiedTokenData = decoded;
	    	next();
	    }
	    
	}else{
        resp.sendStatus(403);
    }
}