import React from 'react'

const OpinionPreview = ({ opinionsFeed }) => (
	<div>
		{opinionsFeed.map(opinion => (
			<div key={opinion.id} className="row d-flex justify-content-left p-4">
				<div className="col-2 text-center">
					<div className="row">
						<div className="col">
							<img
								src={
									process.env.PUBLIC_URL +
									`/images/${opinion.writtenBy.picture}`
								}
								width="50"
								height="50"
								alt={opinion.writtenBy.name}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col">@{opinion.writtenBy.name}</div>
					</div>
				</div>
				<div className="col text-left">
					<div className="row my-1">
						<div className="col-6 p-0">Titre : {opinion.title}</div>
						<div className="col">
							Nombre d'affiliations : {opinion.affiliationsCount}
						</div>
					</div>
					<div className="row mb-2">
						{opinion.tags.map(tag => (
							<span className="px-1" key={opinion.id + tag}>
								#{tag}
							</span>
						))}
					</div>
					<div className="row">{opinion.text}</div>
				</div>
			</div>
		))}
	</div>
)

export default OpinionPreview
