package render

import 	"gopkg.in/unrolled/render.v1"

var R *render.Render

func init(){
	R = render.New()
}