import React from 'react'

const largeInput = {
	height: '150px',
}

const mediumInput = {
	height: '50px',
}

const ActJudgingInterfaceFormFields = ({
	title,
	text,
	sources,
	tags,
	_recordValueInState,
}) => (
	<div>
		<div className="row my-2 d-flex justify-content-center">
			<div className="col-6 text-left">
				Le titre de votre opinion :
				<input
					className="w-100"
					value={title.value}
					onChange={e => _recordValueInState(e.target.value, 'title')}
					type="text"
					placeholder="Entrez votre titre ici..."
				/>
				{title.error && <div>{title.error}</div>}
			</div>
		</div>
		<div className="row my-2 d-flex justify-content-center">
			<div className="col-6 text-left">
				Votre opinion :
				<textarea
					className="w-100"
					style={largeInput}
					value={text.value}
					onChange={e => _recordValueInState(e.target.value, 'text')}
					type="text"
					placeholder="Entrez votre opinion ici..."
				/>
				{text.error && <div>{text.error}</div>}
			</div>
		</div>
		<div className="row my-2 d-flex justify-content-center">
			<div className="col-6 text-left">
				Vos sources, c'est à dire une liste d'urls séparées par des virgules :
				<textarea
					className="w-100"
					style={mediumInput}
					value={sources.value}
					onChange={e => _recordValueInState(e.target.value, 'sources')}
					type="text"
					placeholder="http://www.source1.com/article, source2.com/article2, www.source-3.fr..."
				/>
				{sources.error && <div>{sources.error}</div>}
			</div>
		</div>
		<div className="row my-2 d-flex justify-content-center">
			<div className="col-6 text-left">
				Vos tags, c'est à dire des mots qui décrivent les sujets que vous
				abordez dans votre opinion séparées par des virgules :
				<input
					className="w-100"
					value={tags.value}
					onChange={e => _recordValueInState(e.target.value, 'tags')}
					type="text"
					placeholder="tag1, tag2, tag3..."
				/>
				{tags.error && <div>{tags.error}</div>}
			</div>
		</div>
	</div>
)

export default ActJudgingInterfaceFormFields
