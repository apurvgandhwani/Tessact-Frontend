import {Router} from 'express'
import faker from 'faker'
import moment from 'moment'

var router = new Router();

function generateItem(n = 1){
	return _.range(n).map((x,i)=> {

		return {
			file_name: faker.name.firstName(),
			file_type: _.sample(['Movie', 'TV Show', 'Documentary']),
			file_image: 'http://placehold.it/60x80',
			channel: _.sample(['Zee TV', 'Set Max', 'Zee Cinema', 'Star Gold']),
			duration: _.sample(_.range(5000, 8000)),
			assigned: _.sample(['Ashwin', 'Apurv', 'Rohit', false, false]),
			status: _.sample(['Ongoing', 'Completed', 'Not Done']),
			upload_date: moment(faker.date.recent()).format('DD-MM-YY'),
			tx_date: moment(faker.date.recent()).format('DD-MM-YY')
		}
	})
}


router.get('/items', (req, res)=> {
	var n = req.query.n || 1;
	var data = generateItem(n);

	res.json(data);
})


export default router;