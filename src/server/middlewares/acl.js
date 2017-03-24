const INHERITANCE_INDEXES = {
	'SUPER_ADMIN': 0,
	'ADMIN': 1,
	'USER' : 2,
	'GUEST': 3
}


export default function ACLAllow( role ){
	return (req, res, next)=> {
		var url = req.originalUrl;
		var method = req.method();
	}
}
