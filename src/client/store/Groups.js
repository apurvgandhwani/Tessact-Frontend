import _ from 'lodash'
import request from 'superagent'
const debug = require('debug')('tessact:store:groups')


//const SAMPLE_GROUPS =[{"id":1,"name":"Assistix","members":[{"id":2021,"name":"Marietta","joining_date":1352537508950,"last_activity":1490051971792},{"id":2022,"name":"Roxanne","joining_date":1462731039036,"last_activity":1489808548389},{"id":2023,"name":"Prince","joining_date":1352956820033,"last_activity":1489369054808},{"id":2024,"name":"Mayra","joining_date":1420012795370,"last_activity":1489886576128},{"id":2025,"name":"Holly","joining_date":1452916181424,"last_activity":1489761789171},{"id":2026,"name":"Sheryl","joining_date":1375410372451,"last_activity":1490023897979},{"id":2027,"name":"Dillon","joining_date":1354822574504,"last_activity":1489092366972},{"id":2028,"name":"Joyce","joining_date":1359772565202,"last_activity":1489143644388},{"id":2029,"name":"Johanna","joining_date":1465382127177,"last_activity":1489384321420},{"id":2030,"name":"Wilder","joining_date":1347110295621,"last_activity":1488223305738}]},{"id":2,"name":"Zensure","members":[{"id":2021,"name":"Ivy","joining_date":1338640262703,"last_activity":1489918092327},{"id":2022,"name":"Soto","joining_date":1468913993904,"last_activity":1489535013697},{"id":2023,"name":"Hampton","joining_date":1458246648608,"last_activity":1489890828303},{"id":2024,"name":"Beatrice","joining_date":1411998965547,"last_activity":1489191976353},{"id":2025,"name":"Horton","joining_date":1365265124941,"last_activity":1489041233779},{"id":2026,"name":"Althea","joining_date":1443924841861,"last_activity":1490040737633},{"id":2027,"name":"Maureen","joining_date":1415113340509,"last_activity":1490037897190},{"id":2028,"name":"Louise","joining_date":1367617756858,"last_activity":1488193852176},{"id":2029,"name":"Griffith","joining_date":1409167113249,"last_activity":1488366571206},{"id":2030,"name":"Sutton","joining_date":1445122116557,"last_activity":1488172034272}]},{"id":3,"name":"Anivet","members":[{"id":2021,"name":"Freida","joining_date":1367206622260,"last_activity":1489088500403},{"id":2022,"name":"Connie","joining_date":1465249062683,"last_activity":1489149952940},{"id":2023,"name":"Underwood","joining_date":1441107260648,"last_activity":1490018349829},{"id":2024,"name":"Norris","joining_date":1416205988281,"last_activity":1488965528458}]},{"id":4,"name":"Soprano","members":[{"id":2021,"name":"Lyons","joining_date":1423974168367,"last_activity":1488631786845},{"id":2022,"name":"Pennington","joining_date":1370095766011,"last_activity":1489052183475},{"id":2023,"name":"Rowland","joining_date":1406880852259,"last_activity":1489314051085},{"id":2024,"name":"Bridges","joining_date":1434461408350,"last_activity":1488794780319},{"id":2025,"name":"Penelope","joining_date":1454259819369,"last_activity":1488749785590},{"id":2026,"name":"Chrystal","joining_date":1396803773170,"last_activity":1488465600746}]},{"id":5,"name":"Equitax","members":[{"id":2021,"name":"Guy","joining_date":1454048325398,"last_activity":1489342033477},{"id":2022,"name":"Cassie","joining_date":1487268060734,"last_activity":1489867759745},{"id":2023,"name":"Raymond","joining_date":1474437347807,"last_activity":1489410200506},{"id":2024,"name":"Ford","joining_date":1340102284430,"last_activity":1488766871632},{"id":2025,"name":"Mary","joining_date":1370006677303,"last_activity":1488928961627}]},{"id":6,"name":"Rodemco","members":[{"id":2021,"name":"Alison","joining_date":1404736906597,"last_activity":1488219308076},{"id":2022,"name":"Esther","joining_date":1471873121095,"last_activity":1489424348692},{"id":2023,"name":"Mia","joining_date":1464580937885,"last_activity":1489898052066},{"id":2024,"name":"Callie","joining_date":1482148313133,"last_activity":1488907165939},{"id":2025,"name":"Susanne","joining_date":1474543921131,"last_activity":1490124202695},{"id":2026,"name":"Elliott","joining_date":1389498825571,"last_activity":1489627778147},{"id":2027,"name":"Ronda","joining_date":1342447001474,"last_activity":1490156024777},{"id":2028,"name":"Merritt","joining_date":1403370986814,"last_activity":1490077129639}]},{"id":7,"name":"Billmed","members":[{"id":2021,"name":"Turner","joining_date":1385467500698,"last_activity":1489732961314},{"id":2022,"name":"Sandoval","joining_date":1337985047260,"last_activity":1488959179074},{"id":2023,"name":"Tucker","joining_date":1458820307891,"last_activity":1489930516637},{"id":2024,"name":"Sadie","joining_date":1456033202794,"last_activity":1489488350915},{"id":2025,"name":"Peters","joining_date":1404010860762,"last_activity":1488535146822},{"id":2026,"name":"Rodgers","joining_date":1451898450978,"last_activity":1489831742765},{"id":2027,"name":"Browning","joining_date":1424410400345,"last_activity":1489820431429},{"id":2028,"name":"Alyce","joining_date":1364098464537,"last_activity":1489302559368},{"id":2029,"name":"Sallie","joining_date":1346852210981,"last_activity":1488458111881},{"id":2030,"name":"Wilkerson","joining_date":1388309565442,"last_activity":1488995705604},{"id":2031,"name":"Elizabeth","joining_date":1389050691849,"last_activity":1489694208477},{"id":2032,"name":"Harriett","joining_date":1366774025159,"last_activity":1488790131807}]},{"id":8,"name":"Enervate","members":[{"id":2021,"name":"Baxter","joining_date":1395788555830,"last_activity":1490158006785},{"id":2022,"name":"Chandra","joining_date":1392357340603,"last_activity":1490188093572},{"id":2023,"name":"Copeland","joining_date":1415780694553,"last_activity":1488843677907},{"id":2024,"name":"Karin","joining_date":1359751146379,"last_activity":1488601375589}]},{"id":9,"name":"Eyeris","members":[{"id":2021,"name":"Stone","joining_date":1395355980450,"last_activity":1489983462805},{"id":2022,"name":"Bette","joining_date":1410766181640,"last_activity":1489083805771},{"id":2023,"name":"Salinas","joining_date":1436305897314,"last_activity":1488088598414},{"id":2024,"name":"Walsh","joining_date":1355981518723,"last_activity":1489338958153},{"id":2025,"name":"Erika","joining_date":1447990240164,"last_activity":1489990810111},{"id":2026,"name":"Jessie","joining_date":1424749221952,"last_activity":1488460574862},{"id":2027,"name":"Benjamin","joining_date":1433093344311,"last_activity":1489318805768},{"id":2028,"name":"Debbie","joining_date":1451632585666,"last_activity":1489491340458}]}]

const SAMPLE_GROUPS2 =[{"id":1,"name":"Compliance","members":[{"id":2021,"name":"Manas Mati","joining_date":1352537508950,"last_activity":1490051971792},{"id":2022,"name":"Apurv Gandhwani","joining_date":1462731039036,"last_activity":1489808548389}]}]


const INITIAL_STATE = {
	list: SAMPLE_GROUPS2.map(x => x),
	selectedId: false,
	isLoading: false,
	hasError: false
}

const GROUPS_URL = '/api/group'


const FETCH_GROUPS = 'FETCH_GROUPS'
const fetchGroups = ()=> (dispatch)=> {
	debug('Fetching...')
	dispatch({type: FETCH_GROUPS})

	return request.get(GROUPS_URL)
		.then(res => {
			let list = res.body.results
			debug(`Fetched ${list.length} groups`)
			return dispatch( fetchGroupsSuccess(list) )
		}).catch( err => {
			debug(`Fetch Groups Failed: `, err)
			return dispatch( fetchGroupsError(err) )
		})
}

const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS'
const fetchGroupsSuccess = (list)=> ({
	type: FETCH_GROUPS_SUCCESS,
	list
})

const FETCH_GROUPS_ERROR = 'FETCH_GROUPS_ERROR'
const fetchGroupsError = (err)=> ({
	type: FETCH_GROUPS_ERROR,
	error: err.message
})

const SELECT_GROUP = 'SELECT_GROUP'
const selectGroup = (id)=> ({
	type: SELECT_GROUP,
	id
})


export const actions = {
	fetchGroups,
	selectGroup
}

export default function GroupsReducer(state = INITIAL_STATE, action){
	switch(action.type){
		case FETCH_GROUPS:
			return {...state, isLoading: true, hasError: false}
		case FETCH_GROUPS_SUCCESS:
			return {...state, isLoading: false, list: [...action.list]}
		case FETCH_GROUPS_ERROR:
			return {...state, isLoading: false, hasError: action.error}
		case SELECT_GROUP: 
			return {...state, selectedId: action.id}
		default:
			return state
	}
}