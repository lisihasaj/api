<p>Message provenant de :</p><br/><br/>

@if( !empty($name) && !empty($last_name))         
      <strong>Prénom et nom :</strong> {{$last_name}}, {{$name}}<br/>
@endif

@if( !empty($email))
      <strong>Adresse mail :</strong> {{$email}}<br/>
@endif

@if( !empty($message))
      <strong>Votre demande :</strong> {{$message}}<br/>
@endif
