import React from 'react'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Label = styled.span`
	font-weight: 600;
	font-size: 1.1em;
`
const ErrorMessage = styled.div`
	font-size: 1.1em;
	color: red;
`
const InputBox = styled.input`
  width: 100%
	padding: 5px 10px;
	border-radius: 10px;
	border: none;
	box-shadow: inset 0px 0px 8px #c3c3c3;

	:focus {
		outline-color: white;
	}
`

const TextAreaBox = styled.textarea`
  width: 100%
	padding: 5px 10px;
	border-radius: 10px;
	border: none;
	box-shadow: inset 0px 0px 8px #c3c3c3;
  height: ${props => props.height}px
	:focus {
		outline-color: white;
	}
`

const ActJudgingInterfaceFormFields = ({
	title,
	text,
	sources,
	tags,
	_recordValueInState,
}) => (
	<div>
		<Row my={2} justifyContent="center">
			<Col md={6} textAlign="left">
				<Label> Le titre de votre opinion :</Label>
				<InputBox
					value={title.value}
					onChange={e => _recordValueInState(e.target.value, 'title')}
					type="text"
					placeholder="Entrez votre titre ici..."
				/>
				{title.error && <ErrorMessage>{title.error}</ErrorMessage>}
			</Col>
		</Row>
		<Row my={2} justifyContent="center">
			<Col md={6} textAlign="left">
				<Label>Votre opinion :</Label>
				<TextAreaBox
					height={150}
					value={text.value}
					onChange={e => _recordValueInState(e.target.value, 'text')}
					type="text"
					placeholder="Entrez votre opinion ici..."
				/>
				{text.error && <ErrorMessage>{text.error}</ErrorMessage>}
			</Col>
		</Row>
		<Row my={2} justifyContent="center">
			<Col md={6}>
				<Label>
					Vos sources, c'est à dire une liste d'urls séparées par des virgules :
				</Label>
				<TextAreaBox
					height={80}
					value={sources.value}
					onChange={e => _recordValueInState(e.target.value, 'sources')}
					type="text"
					placeholder="http://www.source1.com/article, source2.com/article2, www.source-3.fr..."
				/>
				{sources.error && <ErrorMessage>{sources.error}</ErrorMessage>}
			</Col>
		</Row>
		<Row my={2} justifyContent="center">
			<Col md={6} textAlign="left">
				<Label>
					Vos tags, c'est à dire des mots qui décrivent les sujets que vous
					abordez dans votre opinion séparées par des virgules :
				</Label>
				<InputBox
					value={tags.value}
					onChange={e => _recordValueInState(e.target.value, 'tags')}
					type="text"
					placeholder="tag1, tag2, tag3..."
				/>
				{tags.error && <ErrorMessage>{tags.error}</ErrorMessage>}
			</Col>
		</Row>
	</div>
)

export default ActJudgingInterfaceFormFields
