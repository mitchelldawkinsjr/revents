<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<h3> {{ $user->name }},</h3>

<div>
    Thank you for signing up with Operation Love. Make sure you look for an email from the Event Host closer to the date confirming your attendance. If you have any questions feel free to email operationlove@revolutioncm.com.

    </br>
    -------------------------------------------------------
    </br>
    <b><em>Here are the details about your event:</em></b>
    </br>
    </br>
    <b>Event Title:</b> {{ $event->title }}
    </br>
    <b>Point Of Contact:</b> {{ $event->contact_email }}
    </br>
    <b>Location:</b> {{ $event->location_name }} <br/> {{ $event->address }}
    </br>
    <b>Event Date:</b> {{ $event->date }}
    </br>
    <b>Start Time:</b> {{ $event->start_time }}
    </br>
    <b>End Time:</b> {{ $event->end_time }}

    In His Service,
    Operation Love @ The Revolution
</div>
</body>
</html>