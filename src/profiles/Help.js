import '../style.css'
import gmail1 from './images/gmail1.png'
import gmail2 from './images/gmail2.png'
import gmail3 from './images/gmail3.png'
import gmail4 from './images/gmail4.png'
import gmail5 from './images/gmail5.png'

export default function Help() {
    const headerClick = (event) => {
        event.target.classList.toggle("active")
        const accordionItemBody = event.target.nextElementSibling;
        if (event.target.classList.contains("active")) {
            accordionItemBody.style.maxHeight = "100%";

        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    }
    return (
        <div className="accordian-container">
            <h1> Getting your IMAP code </h1>
            <div className="accordian">
                <div className="accordian-item">
                    <div className="accordian-item-header" onClick={headerClick}>
                        Gmail
                    </div>
                    <div className="accordian-item-body">
                        <div className="accordian-item-body-content">
                            <p> Enable IMAP for your email: </p>
                            <ol>
                                <li> Click the gear icon at the top right. </li>
                                <img src={gmail1}/>
                                <li> Click See all settings. </li>
                                <li> Click Forwarding and POP/IMAP.  </li>
                                <li> Under the IMAP access section, select the Enable IMAP option. </li>
                                <img src={gmail2} style={{width: "100%", height: "100%"}}/>
                                <li> Save the changes. </li>
                            </ol>
                            <p> Getting your Gmail app password: </p>
                            <ol>
                                <li> Click your profile picture at the top right. </li>
                                <li> Click Manage Your Google Account. </li>
                                <img src={gmail3} style={{width: "70%", height: "70%"}}/>
                                <li> Select the Security tab on the left-side menu. </li>
                                <li> Under the "How you sign in to Google" section, if you do not have 2-step
                                    verification set up, please set it up. Otherwise, click 2-Step Verification. </li>
                                <img src={gmail4} style={{width: "100%", height: "100%"}}/>
                                <li> Scroll to the bottom and click App passwords. </li>
                                <li> Under select app, click the Mail option. </li>
                                <li> Under select device, click whatever device you are using. </li>
                                <img src={gmail5} style={{width: "100%", height: "100%"}}/>
                                <li> Click generate and copy and paste the app password into IMAP code. </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="accordian-item">
                    <div className="accordian-item-header" onClick={headerClick}>
                        Outlook
                    </div>
                    <div className="accordian-item-body">
                        <div className="accordian-item-body-content">
                        <p> Enable IMAP for your email: </p>
                            <ol>
                                <li> Click the gear icon at the top right. </li>
                                
                                <li> Click See all settings. </li>
                                <li> Click Forwarding and POP/IMAP.  </li>
                                <li> Under the IMAP access section, select the Enable IMAP option. </li>
                                <li> Save the changes. </li>
                            </ol>
                            <p> Getting your Gmail app password: </p>
                            <ol>
                                <li> Click your profile picture at the top right. </li>
                                <li> Click Manage Your Google Account. </li>
                                <li> Select the Security tab on the left-side menu. </li>
                                <li> Under the "How you sign in to Google" section, if you do not have 2-step
                                    verification set up, please set it up. Otherwise, click 2-Step Verification. </li>
                                <li> Scroll to the bottom and click App passwords. </li>
                                <li> Under select app, click the Mail option. </li>
                                <li> Under select device, click whatever device you are using. </li>
                                <li> Copy and paste the app password into IMAP code. </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}