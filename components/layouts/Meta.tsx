import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RootState} from "../../redux/store";
import {useRouter} from "next/router";
import Header from "next/head";

type headProps = {

};

const Meta: React.FunctionComponent<headProps> = ({}) => {
	const dispatch = useAppDispatch();
	const layout = useAppSelector((state: RootState) => state.layout);
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<Header>
				<title>{'ERP'}</title>
				<meta name="description" content={'ERP'}/>
				<meta name="twitter:card" content="summary" key="twcard" />
				<meta property="og:url" content={'url'}/>
				<meta property="og:type" content="website" />
				<meta property="og:image" content={'image.src'} key="ogimage" />
				<meta property="og:image:alt" content={'image.alt'} key="ogimagealt" />
				<meta property="og:image:width" content={'defaultImageWidth'} key="ogimagewidth" />
				<meta property="og:image:height" content={'defaultImageHeight'} key="ogimageheight" />
				<meta property="og:site_name" content={"Embol"} key="ogsitename" />
				<meta property="og:title" content={'title.value'} key="ogtitle" />
				<meta property="og:description" content={'description.value'} key="ogdesc" />
				<meta property="og:locale" content="es_LA" key="oglocale" />
			</Header>
		</>
	);
}
export default Meta;
