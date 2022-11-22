import { IGetGXStateReturn } from "../utils/gxstate";

export const getNotices = ({ $ }: IGetGXStateReturn) => {
	const $table = $('#TABLE5');
	$table
		.find('script')
		.remove()

	const notices: string[] = $table
		.find('tr')
		.map((_, el) =>
			$(el)
				.find('p')
				.map((_i, p) =>
					$(p)
						.text()
						.trim()
						.replaceAll('\n','')
						.replaceAll('\t','')
						.replaceAll(' ','')
				)
				.get()
				.filter(text => text !== '')
				.join('\n')
		)
		.get()
		.filter((notice) => notice !== '');

	return notices;
}