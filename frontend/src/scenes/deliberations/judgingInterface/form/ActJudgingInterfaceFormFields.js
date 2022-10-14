import React from 'react'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Label = styled.span`
	font-size: 24px
  font-weight: 600;
  color: #545A66;
  margin-bottom:12px
`
const Description = styled.div`
  font-size: 16px
  margin-bottom:12px
`

const ErrorMessage = styled.div`
	font-size: 1.1em;
	color: red;
`
const InputBox = styled.input`
  width: 100%
	padding: 6px 10px;
	border-radius: 12px;
	border: solid 1px #A9B4CC;
  background-color: #F7F7F7;
  margin-bottom: ${props => props.marginBottom}
  :focus {
    outline: none;
		box-shadow: 0 0 0 3px #A9B4CC;
	}
  :focus::-webkit-input-placeholder { color:transparent; }
  :focus:-moz-placeholder { color:transparent; } /* FF 4-18 */
  :focus::-moz-placeholder { color:transparent; } /* FF 19+ */
  :focus:-ms-input-placeholder { color:transparent; } /* IE 10+ */
`

const TextAreaBox = styled.textarea`
  width: 100%
	padding: 6px 10px;
	border-radius: 12px;
	border: solid 1px #A9B4CC;
  background-color: #F7F7F7;
  height: ${props => props.height}px
	:focus {
		outline: none;
		box-shadow: 0 0 0 3px #A9B4CC;
	}
  :focus::-webkit-input-placeholder { color:transparent; }
  :focus:-moz-placeholder { color:transparent; } /* FF 4-18 */
  :focus::-moz-placeholder { color:transparent; } /* FF 19+ */
  :focus:-ms-input-placeholder { color:transparent; } /* IE 10+ */
`
const AddFields = styled.button`
	border: none;
	color: #a9b4cc;
	background-color: none;
	font-weight: 600;
	cursor: pointer;
	:hover {
		text-decoration: underline;
	}
`

class ActJudgingInterfaceFormFields extends React.Component {
	render() {
		const {
			title,
			text,
			sources,
			tags,
			_recordValueInState,
			_addFields,
		} = this.props

		return (
			<div>
				<Row justifyContent="center" mb="24px">
					<Col textAlign="left">
						<Label> Donnez un titre à votre opinion*</Label>
						<Description>
							Votre titre aidera les autres Pandas à répérer votre opinion parmi
							les autres.
						</Description>
						<InputBox
							value={title.value}
							onChange={e => _recordValueInState(e.target.value, 'title')}
							type="text"
							placeholder="Titre..."
						/>
						{title.error && <ErrorMessage>{title.error}</ErrorMessage>}
					</Col>
				</Row>
				<Row justifyContent="center" mb="24px">
					<Col textAlign="left">
						<Label>Rédigez votre opinion*</Label>
						<Description>
							Résumez l’ensemble de vos recherches, c’est le moment d’aider les
							autres Pandas à juger.
						</Description>
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
				<Row my={2} justifyContent="center" mb="24px">
					<Col textAlign="left">
						<Label>Ajoutez vos sources*</Label>
						<Description>Sur quoi votre opinion s’appuie-t-elle ?</Description>
						{sources.map((source, i) => (
							<div key={i}>
								<InputBox
									marginBottom="6px"
									value={source.value}
									onChange={e =>
										_recordValueInState(e.target.value, 'sources', i)
									}
									type="text"
									placeholder={`http://www.source${i + 1}.com/article`}
								/>
								{source.error && <ErrorMessage>{source.error}</ErrorMessage>}
							</div>
						))}
						<div>
							<AddFields onClick={() => _addFields('sources')}>
								{' '}
								+ ajouter une source supplémentaire
							</AddFields>
						</div>
					</Col>
				</Row>
				<Row justifyContent="center" mb="24px">
					<Col textAlign="left">
						<Label>Ajoutez vos tags</Label>
						<Description>
							Décrivez le sujet de votre opinion en quelques mots-clés pour
							aider les Pandas à la trouver via les filtres et recherches.
						</Description>
						{tags.map((tag, i) => (
							<div key={i}>
								<InputBox
									marginBottom="6px"
									value={tags.value}
									onChange={e => _recordValueInState(e.target.value, 'tags', i)}
									type="text"
									placeholder={`tag${i + 1}...`}
								/>
								{tag.error && <ErrorMessage>{tag.error}</ErrorMessage>}
							</div>
						))}
						<div>
							<AddFields onClick={() => _addFields('tags')}>
								{' '}
								+ ajouter un tag supplémentaire
							</AddFields>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default ActJudgingInterfaceFormFields
