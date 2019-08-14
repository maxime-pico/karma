// @flow
import React from 'react'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

/* This page is available at /about Very simple page, just a lot of text there */

// Specific styles for the page
const BackGround = styled(Grid)`
	width: 70%;
	max-width: 885px;
	background-color: white;
	border-radius: 90px;
`

const Title = styled.div`
	color: #545a66;
	font-size: 40px;
	font-weight: 900;
	margin-bottom: 24px;
`

const Header1 = styled.div`
	color: #545a66;
	font-size: 30px;
	font-weight: 900;
	margin-bottom: 12px;
	margin-top: 42px;
`
const Header2 = styled.div`
	color: #545a66;
	font-size: 24px;
	margin-top: 24px;
	margin-bottom: 6px;
`
const TableOfContent = styled.div`
	font-size: 14px;
	padding-left: 24px;
	ul {
		font-size: 12px;
		list-style-type: none;
	}
`
const Note = styled.div`
	font-size: 14px;
`

// The About component Displays the text of the page, no other components called here
const About = () => {
	return (
		<div>
			<BackGround my="96px" p="60px">
				<Row justifyContent="center">
					<Col md={12} textAlign="left" fontSize="18px" color="#7F8799">
						<Title>Karma Panda — à propos du projet</Title>
						<Header1>
							C’est quoi ce énième projet qui veut changer le monde ?
						</Header1>
						<p>
							<Note>
								Note: Le même contentu existe dans un dossier .pdf mise en forme
								(plus facile à lire)
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://raw.githubusercontent.com/Green-Dirt/karma/9c34111e13c4889a7018602ac2fac102e9372027/Dossier_Krama_Panda.pdf"
								>
									<b>
										 <u>disponible ici </u>
									</b>
								</a>
							</Note>
						</p>
						<p>
							Beaucoup d’entreprises multiplient les efforts pour que le monde
							avance dans le bon sens, en réduisant leur impact écologique, en
							améliorant le quotidien des populations qui travaillent ou
							dépendent d’elles, en inventant de nouveaux systèmes de
							gouvernance plus démocratiques...
						</p>
						<p>
							<b>
								Et d’autres continuent de commettre des actes inacceptables.
							</b>
						</p>
						<Header2> Sommaire</Header2>
						<TableOfContent>
							Pourquoi on s'attaque aux marques ?
							<ul>
								<li>
									<a href="#pandas">Une armée de pandas endormis</a>
								</li>
								<li>
									<a href="#soul">Comment voir l’Âme...</a>
								</li>
								<li>
									<a href="#brands">...qui se cache derrière une marque</a>
								</li>
							</ul>
							L'idée
							<ul>
								<li>
									<a href="#karma">Appliquons les lois du Karma</a>
								</li>
								<li>
									<a href="#plan">C’est quoi le plan ?</a>
								</li>
							</ul>
							Le Karma d'une entreprise
							<ul>
								<li>
									<a href="#judge">
										Qui décide si une entreprise est bonne ou mauvaise ?
									</a>
								</li>
								<li>
									<a href="#precise">Et plus concrètement ?</a>
								</li>
							</ul>
							Les Causes
							<ul>
								<li>
									<a href="#guide">
										Et ils jugent sur quelle base ? Au pifomètre ?
									</a>
								</li>
							</ul>
							Les Actes
							<ul>
								<li>
									<a href="#community">
										OK. Et dans ce cas, qui juge les actes ?
									</a>
								</li>
								<li>
									<a href="#random">Et cette fois ci, c’est au pifomètre ?</a>
								</li>
							</ul>
							Les Opinions
							<ul>
								<li>
									<a href="#opinion">
										Attends, attends, c’est quoi une opinion ?
									</a>
								</li>
								<li>
									<a href="#trust">
										Et comment on peut être sur que les opinions sont fiables ?
									</a>
								</li>
							</ul>
							Personnalisation
							<ul>
								<li>
									<a href="#nofilter">
										Comment je peux savoir si une entreprise fait quelque chose
										que je ne peux pas supporter ?
									</a>
								</li>
							</ul>
							Objectifs
							<ul>
								<li>
									<a href="#money">Vous allez faire du fric avec ça ?</a>
								</li>
								<li>
									<a href="#goal1">C'est quoi votre objectif à moyen terme ?</a>
								</li>
								<li>
									<a href="#goal2">C’est quoi votre objectif à long terme ?</a>
								</li>
							</ul>
							Avancement
							<ul>
								<li>
									<a href="#status">Et vous en êtes où aujourd’hui ?</a>
								</li>
							</ul>
							Contacts
							<ul>
								<li>
									<a href="#contact">
										Ok, cool. Ça m’intéresse : c’est quoi votre contact ?
									</a>
								</li>
							</ul>
						</TableOfContent>
						<Header1 id="pandas"> Une armée de pandas endormis</Header1>
						<p>
							Notre consommation est une arme de transformation massive, capable
							de changer le monde en profondeur. En tant que citoyens, nous
							pouvons choisir d’aider les entreprises qui défendent nos valeurs
							à se développer. Et nous pouvons faire disparaître celles qui les
							bafouent. Mais tout ça n’est possible qu’à une condition : que
							nous soyons suffisamment éveillés, c’est à dire informés, pour
							déterminer ensemble quelles entreprises vont dans le sens de
							l’intérêt général, et lesquelles n’y vont pas.
						</p>
						<Header1 id="soul">Comment voir l’Âme...</Header1>
						<p>
							Journalistes, activistes, lanceurs d’alertes... Beaucoup
							travaillent à fournir au grand public des informations fiables et
							concrètes sur les actes réels des entreprises. Actes qui, pour
							nous, constituent leurs Âmes. Malheureusement, ces informations
							ont peu d’impact sur nos habitudes de consommation : contrairement
							aux communications de marques, elles ne sont délivrées ni au bon
							endroit, ni au bon moment. On découvre, on s’offusque et, la
							plupart du temps, on oublie. Pas de soucis : c’est normal, c’est
							humain.
						</p>
						<Header1 id="brands">...qui se cache derrière une marque</Header1>
						<p>
							Sur internet comme dans la vie, plus nous nous rapprochons de
							l’acte d’achat, plus les marques monopolisent le territoire
							d’expression. Publicité, influence, packaging... Les entreprises
							maîtrisent autant que possible les canaux d’informations et
							brouillent la lisibilité de la réalité de leurs actions. C’est
							d’ailleurs à ça que sert une marque. Nous sommes bien placés pour
							le savoir : les trois fondateurs de l’organisation Karma Panda
							(Swedish Monkey, Onkalo et Green Dirt) sont des professionnels de
							la communication qui ont décidé de mettre leurs compétences au
							service de l’intérêt général.
						</p>
						<Header1 id="karma">Appliquons les lois du Karma</Header1>
						<p>
							Pour aider les citoyens à identifer clairement les entreprises
							qu’ils jugent bénéfiques, il fallait créer un contre-pouvoir
							démocratique aussi puissant que celui des marques. Et c’est
							pourquoi nous avons fondé l’organisation Karma Panda. Notre
							mission est de donner aux citoyens la possibilité d’accéder
							facilement à une image fiable et immédiatement compréhensible de
							l’Âme d’une entreprise, à chaque fois qu’ils croisent l’une de ces
							marques sur internet. Les entreprises qui vont dans le sens de
							l’intérêt général verront leur image s’améliorer
							proportionnellement à leurs efforts. Les autres seront forcées de
							changer radicalement, ou de disparaître.
						</p>
						<Header1 id="plan">C’est quoi le plan ?</Header1>
						<Header2> >> Un plug-in</Header2>
						<p>
							Tout le monde connaît AdBlock : une extension de navigateur qui se
							télécharge et s’installe en quelques secondes, et permet de surfer
							sur internet sans aucune publicité.
						</p>
						<p>
							Un plug-in de ce type, aussi simple d’utilisation, pourrait
							identifier n’importe quelle marque, dans n’importe quelle page
							web, et y associer un symbole indiquant si l’entreprise est plutôt
							bonne, ou plutôt mauvaise.
						</p>
						<p>
							Un survol permettrait ensuite d’accéder à une notation plus
							détaillée (écologie, éthique, fiscalité, etc.) (le Résumé de
							l’Âme) et à une page référençant tous les actes de l’entreprise
							sur la base de sources accessibles sur le web (l’Âme). Ce plug-in,
							nous l’avons déjà développé.
						</p>
						<Header1 id="judge">
							Qui décide si une entreprise est bonne ou mauvaise ?
						</Header1>
						<p>
							<b>La communauté des Pandas Sacrés.</b>
						</p>
						<p>
							C’est-à-dire l’ensemble des personnes qui souhaitent contribuer à
							la Cause, sans aucune distinction de quelque nature que ce
							soit.Tous les citoyens sont invités à participer à la construction
							de cette organisation qui nous appartient collectivement.
						</p>
						<p>
							<i>
								« Nous avons une conviction : tout le monde est légitime de
								juger des actes d’une entreprise, puisque les conséquences de
								ces actes nous touchent tous, collectivement. Karma Panda doit
								être capable de fournir une information accessible à tous pour
								que chacun puisse justifier ses jugements. »
							</i>
						</p>
						<Header1 id="precise">Et plus concrètement ?</Header1>
						<p>
							Toutes les personnes ayant téléchargé le plugin pourront
							participer à la notation de l’Âme d’une entreprise. Ils devront
							attribuer un Karma allant de - 2 à 2 sur les 4 grandes Causes :
							Environnementale, Éthique, Fiscale & Gouvernance et Sociale. Le
							Karma d’une entreprise est tout simplement la moyenne* des avis
							des Pandas Sacrés, c’est-à-dire des contributeurs qui ont
							téléchargé le plug-in et participé à la notation. Pour nous, c’est
							l’indice le plus fiable pour juger du comportement d’une
							entreprise.
						</p>
						<p>
							<Note>
								*Les utilisateurs du plugin peuvent pondérer les différentes
								causes pour que les notes af chées par leur plugin re ètent au
								mieux leurs préoccupations.
							</Note>
						</p>
						<Header1 id="guide">
							Et ils jugent sur quelle base ? Au pifomètre ?
						</Header1>
						<p>
							Pour chaque Cause, les Pandas peuvent consulter des Actes qui les
							informent simplement et rapidement sur les actions d’une
							entreprise sur un sujet donné.
						</p>
						<p>
							Ces Actes prennent la forme de pictogrammes correspondant à des
							sous-catégories plus précises que les Causes. Ils sont composés
							d’un code couleur allant du bleu Très Bénéfique au rouge Très
							Maléfique accompagnés de 10 mots clefs (Hashtags Majeurs).
						</p>
						<p>
							<i>
								A titre d’exemple, la Cause Environnementale est décomposée en 4
								Actes : Implication dans le changement climatique / Préservation
								des écosystèmes / Préservation des ressources naturelles /
								Condition animale.
							</i>
						</p>
						<Header1 id="community">
							OK. Et dans ce cas, qui juge les actes ?
						</Header1>
						<p>
							La communauté des Pandas Sacrés : toutes les personnes ayant
							téléchargé le plugin et renseigné leur Profil pourront juger d’un
							Acte. Ils attribueront une note sur un spectre allant de « Très
							Bénéfique » à « Très Maléfique » sur la Page de Délibération de
							l’Acte.
						</p>
						<Header1 id="random">
							Et cette fois ci, c’est au pifomètre ?
						</Header1>
						<p>
							Chaque Jugement d’Acte doit être justfié par une Opinion. Le Panda
							qui juge l’Acte peut soit en rédiger une (devenant à cette
							occasion Panda Sacré), soit affilier son vote à l’Opinion d’un
							Panda Sacré déjà rédigée sur la Page Délibération, qu’il trouve
							suf samment pertinente pour y affilier son choix. C’est d’ailleurs
							en s’affiliant à une op...
						</p>
						<Header1 id="opinion">
							{' '}
							Attends, attends, c’est quoi une opinion ?
						</Header1>
						<p>Excellente question : c’est là que ça devient intéressant.</p>
						<p>
							L’Opinion est la clef de voûte de notre système de collecte
							d’information participatif. Le « ventre de la bête ». La forêt de
							bambou ! Bref : c’est là que ça se joue.
						</p>
						<p>
							Les Opinions sont des avis rédigés par les Saints Pandas sur un
							Acte précis, pour une entreprise donnée. Des indications lui sont
							fournies pour qu’il puisse mener ses recherches sur le web et
							réunir un maximum d’informations sur l’entreprise concernant
							l’Acte qu’il est en train de juger.
						</p>
						<p>
							Lorsque ses recherches sont terminées, le Saint Panda rédige une
							synthèse, y associe un titre, l’ensemble des sources qui lui ont
							servies à rédiger son Opinion ainsi que les hashtags qui résument
							ses recherches. L’objectif est que l’Opinion soit la plus claire,
							la plus honnête et la plus lisible possible, pour que chacun
							puisse se faire un avis sur le sujet.
						</p>
						<Header1 id="trust">
							Et comment on peut être sur que les opinions sont fiables ?
						</Header1>
						<p>Excellente question ! (encore)</p>
						<p>
							Comme on le disait plus haut, le Jugement d’un Acte doit
							obligatoirement être affilié à une Opinion. On parle alors de
							Sacrement. A chaque fois qu’une Opinion est sacrée, elle gagne du
							« poids ». Elle remonte dans la liste des Opinions et est plus
							lisible. Les Opinions qui sont donc jugées les plus pertinentes
							par la communauté seront donc mécaniquement celles qui seront
							présentées le plus fréquemment aux Pandas qui souhaitent
							s’informer sur l’Acte.
						</p>
						<p>
							Mais ce n’est pas tout : si vous avez bien suivi les questions
							précédentes, vous devez savoir que sur la page Âme d’une
							entreprise, les pictogrammes des Actes mettent en avant dix
							Hashtags Majeurs, qui résument en réalité les Délibérations sur
							l’Acte. Ces hashtags sont ceux qui apparaissent le plus souvent
							sur les Opinions, pondérées par les Sacrements des Opinions
							auxquels ils sont associés (c’est un peu technique, mais si vous
							relisez bien ça a du sens).
						</p>
						<Header1 id="nofilter">
							Comment je peux savoir si une entreprise fait quelque chose que je
							ne peux pas supporter ?
						</Header1>
						<p>
							De la même manière que vous pouvez pondérer les notations de votre
							plug-in en fonction de ce qui vous préoccupe le plus, vous avez la
							possibilité de mettre en place des alertes sur des sujets précis.
						</p>
						<p>
							Si, par exemple, vous avez mis une alerte sur le travail des
							enfants, et que cette dénomination apparaît dans un des dix
							Hashtags Majeurs d’un Acte d’une marque, un symbole spécifique est
							affiché sur l’Acte pour attirer votre attention. Vous pourrez
							ensuite vous renseigner sur les Opinions qui portent ce hashtag.
						</p>
						<p>
							L’alerte sera aussi visible à côté de la Cause (à laquelle est
							associée l’Acte) sur le Résumé de l’Âme de l’entreprise, et à côté
							du symbole Karma que le plug-in associe au nom de la marque
							partout où vous la croisez sur le web.
						</p>
						<p>
							Autant dire que plus jamais une entreprise ne pourra cacher quoi
							que ce soit derrière une marque.
						</p>
						<Header1 id="money">Vous allez faire du fric avec ça ?</Header1>
						<Header2> >> Non</Header2>
						<p>
							Nous voyons l’organisation Karma Panda comme un engagement
							citoyen. Le projet le projet restera à but non lucratif et ouvert.
							Il appartient aux citoyens qui décident de s’en emparer. Si nous
							récoltons des dons ou des subventions, ils seront intégralement
							investis dans le développement du projet.
						</p>
						<Header1 id="goal1">
							C'est quoi votre objectif à moyen terme ?
						</Header1>
						<p>
							Pour nous assurer que le projet puisse atteindre le grand public,
							nous voulons que la communauté compte au minimum 10 000 Pandas
							Éveillés dans le mois du lancement public du Plug-in.
						</p>
						<p>
							Pour y parvenir, nous comptons organiser un évènement de lancement
							public autour du thème de la responsabilité sociétale des
							entreprises. Cet évènement réunira les membres de la communauté
							ayant participé à la première phase de notation, des médias, des
							ambassadeurs du projet, des intervenants spécialistes, ainsi que
							des artistes présentant des oeuvres et performances en lien avec
							le thème.
						</p>
						<p>
							Au programme : conférences, workshops, séances de notation,
							performances artistiques, projections, échanges, petits fours
							responsables, etc.
						</p>
						<p>
							Nous nous donnons un an et demi maximum pour y parvenir. Mais les
							délais pourraient se raccourcir en fonction de l’avancée du projet
							(et donc de votre engagement).
						</p>
						<Header1 id="goal2">
							C’est quoi votre objectif à long terme ?
						</Header1>
						<Header2> >> Changer le monde (en mieux).</Header2>
						<p>
							Et plus précisément, nous comptons développer :
							<ul>
								<li>
									De nouvelles fonctionnalités allant dans le sens de notre
									action (recommandation de marque avec un meilleur Karma,
									réalité augmentée, accès à des classements par secteur,
									ChatBot etc.)
								</li>
								<li>
									De nouveaux projets capables de répondre à notre mission.
								</li>
								<li>
									Des outils de documentation et des projets artistiques pour
									sensibiliser le grand public à la responsabilité sociétale des
									entreprises.
								</li>
								<li>
									L’objectif final est de structurer l’organisation comme une
									ONG décentralisée qui répondra par tous les moyens mis à sa
									disposition à sa mission première :{' '}
									<b>Appliquer la loi du Karma.</b>
								</li>
							</ul>
						</p>
						<Header1 id="status">Et vous en êtes où aujourd’hui ?</Header1>
						<p>
							Aujourd’hui, nous avons beaucoup avancé dans la conception du
							projet, mais tout reste à faire ! Plusieurs chantiers sont en
							cours :
						</p>
						<Header2>Technologie</Header2>
						<p>
							La technologie du plugin est déjà fonctionnelle (elle sera
							optimisée). Nous sommes en train de développer un premier
							prototype fonctionnel de la partie notation, qui nous permettra de
							constituer une base de donnée de notations.
						</p>
						<Header2>Communauté</Header2>
						<p>
							Vous l’aurez compris, la communauté des Pandas est centrale dans
							le projet. Nous commençons d’ores et déjà à la structurer. Dans
							cette première phase, nous cherchons à nous rapprocher
							d’universités pour améliorer le système de notation d’une part, et
							pour associer plusieurs Masters à la notation des premières
							entreprises. Nous élargirons ensuite la communauté à des
							associations en lien avec notre mission (associations de
							consommateurs, ONG, etc.), à des communautés pertinentes, puis
							enfin au grand public.
						</p>
						<Header2>Communication</Header2>
						<p>
							Nous finalisons l’identité graphique, le design des interfaces et
							les premiers outils de communication (plaquette de présentation,
							mockups, ce site web, vidéos explicatives etc.). Un gros travail
							d’animation des interfaces va être lancé. De nombreux autres
							supports sont prévus, notamment du Brand Content et des projets
							artistiques en lien avec le projet.
						</p>
						<Header2>Ambassadeurs & partenaires</Header2>
						<p>
							La notoriété du projet dans sa phase de lancement dépendra en
							grande partie des soutiens publics que nous arriverons à fédérer.
							Nous cherchons donc 4 parrains-ambassadeurs pour soutenir le
							projet :
							<ul>
								<li> Un expert reconnu de la RSE</li>
								<li>Un activiste/lanceur d’alerte</li>
								<li>
									Une personnalité publique (nous avons déjà un accord de
									principe)
								</li>
								<li>Un artiste connu pour ses engagements</li>
							</ul>
							Nous cherchons également des associations et collectifs dont la
							mis- sion est en cohérence avec la notre, pour apporter une
							résonance au projet lors de sa phase de lancement et une aide
							logistique, notamment pour l’organisation de l’évènement.
						</p>
						<Header1 id="contact">
							Ok, cool. Ça m’intéresse : c’est quoi votre contact ?
						</Header1>
						<p>
							Pour la partie <b>communication</b> : <br />
							Swedish Monkey / swedishmonkey.karmapanda@protonmail.com
						</p>
						<p>
							Pour la partie <b>technique / développement / design</b> :<br />
							Green Dirt / greendirt.karmapanda@protonmail.com
						</p>
						<p>
							Pour la partie <b>Partenariat / Influence</b> :<br />
							Onkalo / onkalo.karmapanda@protonmail.com
						</p>
					</Col>
				</Row>
			</BackGround>
		</div>
	)
}

export default About
