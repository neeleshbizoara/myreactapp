const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
    constructor( {subject, recipients}, content ){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSetting = new helper.TrackingSettings();
        const clickTrackring = new helper.ClickTracking(true, true);

        trackingSetting.setClickTracking(clickTrackring);
        this.addTrackingSettings(trackingSetting);
    }

    addRecipients() {
        const personilize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personilize.addTo(recipient);
        });
        this.addPersonalization(personilize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;