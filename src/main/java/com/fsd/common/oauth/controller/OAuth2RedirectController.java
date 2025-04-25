package com.fsd.common.oauth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuth2RedirectController {

    @GetMapping("/oauth2/redirect")
    public String redirect() {
        return "oauth2/redirect";
    }
} 