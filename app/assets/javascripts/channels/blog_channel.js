import consumer from './consumer'

const App = {
	global_chat: unidentified
}

$(document).on('turbolinks:load', function () {

	let comments = $('#comments');

	if comments.length > 0 {
		App.global_chat = consumer.subscriptions.create({channel: "BlogChannel",blog_id: comments.data('blog_id')}, {
			connected () {

			},

			disconnected () {

			},

			received(data) {
				comments.append(data['comment']);
			},

			send_comment(comment, blog_id) {
				console.log(blog_id);
				this.perform('send_comment', {comment: comment, blog_id: blog_id});
			}
		});
	};

	$('#new_coment').submit((e) => {
		let $this = $(this)
		let textarea = $this.find('#comment_content')
		if ($.trim(textarea.val()).length > 1) {
			App.global_chat.send_comment(textarea.val(), comments.data('blog_id'));
			textarea.val('');
		};
		e.preventDefault()
		return false;
	});
});