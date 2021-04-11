this.manifest = {
    "name": "Capture Twitter",
    "icon": "icon.png",
    "settings": [
        {
            "tab": i18n.get("information"),
            "group": i18n.get("General"),
            "name": "myDescription",
            "type": "description",
            "text": i18n.get("description")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("General"),
            "name": "tofile",
            "type": "checkbox",
            "label": i18n.get("tofile"),
            "text": i18n.get("x-characters")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("General"),
            "name": "totweet",
            "type": "checkbox",
            "label": i18n.get("totweet"),
            "text": i18n.get("x-characters")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("General"),
            "name": "writemsg",
            "type": "text",
            "label": i18n.get("writemsg"),
            "text": "#TweetCapture"
        }
    ],
    "alignment": [        
    ]
};
