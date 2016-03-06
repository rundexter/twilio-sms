var twilio = require('twilio');

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var sid   = dexter.environment('TWILIO_ACCOUNT_SID')
          , token = dexter.environment('TWILIO_AUTH_TOKEN')
          , phone = step.input('phone').first()
          , msg   = step.input('message').first()
          , from  = step.input('from').first()
          , mediaUrl = step.input('mediaUrl').first()
          , data 
        ;

        if(!sid)   return this.fail('TWILIO_ACCOUNT_SID environment variable must be set');
        if(!token) return this.fail('TWILIO_AUTH_TOKEN environment variable must be set');
        if(!phone) return this.fail('phone required');
        if(!msg)   return this.fail('message is required');
        if(!from)  return this.fail('from phone number is required');

        data = {
            to: phone
            , body: msg
            , from: from
        };

        if(mediaUrl) data.mediaUrl = mediaUrl;

        twilio(sid,token).sendMessage(data
          , function(err) {
              return err 
                  ? this.fail(err)
                  : this.complete({})
              ;
          }.bind(this));
    }
};
