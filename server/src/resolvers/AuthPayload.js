function user(root, args, context, info) {
	return context.prisma.query.user({ where: { id: root.user.id } }, info)
}

module.exports = { user }
