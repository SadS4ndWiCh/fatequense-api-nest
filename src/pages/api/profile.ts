import { api } from './_libs/api';
import { getGXStateOf } from './_libs/utils/gxstate';
import { withRouteOptions } from './_libs/utils/api-route';
import { getProfile } from './_libs/scrappers/profile.scrap';
import { decodeAuthToken, getAuthToken } from './_libs/utils/jwt';

export default withRouteOptions(async (req, res) => {
	const token = getAuthToken(req);
	if (!token) return res
		.status(400)
		.json({ error: 'Token de autorização não foi informado' });
	
	const decodedToken = decodeAuthToken(token);
	if (!decodedToken) return res
		.status(401)
		.json({ error: 'Token de autorização inválido' });

	const { data: html, success } = await api.get('home', decodedToken.cookie);
	if (!success) {
		return res.status(400).json({
			error: 'Cookie inválido',
		})
	}

	const gxstate = getGXStateOf(html);
	if (gxstate === null) return res
		.status(500)
		.json({ error: 'Ocorreu um problema ao pegar as informações' });

	if (gxstate.prefix == null) return res.status(500).json({
		error: 'Não foi possível pegar os dados adequadamente'
	})

	const profile = getProfile(gxstate);

	return res.status(200).json({ profile });
});